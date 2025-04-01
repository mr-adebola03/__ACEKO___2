from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import (
    UserRegisterSerializer, 
    UserLoginSerializer,
    UserApprovalSerializer,
    ChangePasswordSerializer,
    UserProfileSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import random
import string

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()

class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None or not user.check_password(password):
            return Response({'error': 'Email ou mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_approved:
            return Response({'error': 'Votre compte n\'a pas encore été approuvé par l\'administrateur'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserProfileSerializer(user).data
        })

class ApproveUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserApprovalSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # mdp temporaire
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        print(password)
        instance.set_password(password)
        instance.temporary_password = password
        instance.is_approved = True
        instance.is_active = True
        instance.save()
        
        #email utilisateur
        self.send_approval_email(instance, password)
        
        return Response({
            'status': 'success',
            'message': 'Utilisateur approuvé avec succès',
            'user': UserProfileSerializer(instance).data
        })
    
    def send_approval_email(self, user, password):
        subject = "Votre compte a été approuvé"
        html_message = render_to_string('user_approval_email.html', {
            'user': user,
            'password': password,
        })
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to = user.email
        
        send_mail(subject, plain_message, from_email, [to], html_message=html_message)

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'error': 'Ancien mot de passe incorrect'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.validated_data['old_password'] == serializer.validated_data['new_password']:
            return Response({'error': 'Le nouveau mot de passe doit être différent de l\'ancien'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        #update mot de passe
        user.set_password(serializer.validated_data['new_password'])
        user.temporary_password = None  
        user.save()
        
        return Response({'status': 'success', 'message': 'Mot de passe changé avec succès'})

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class PendingApprovalListView(generics.ListAPIView):
    queryset = User.objects.filter(is_approved=False)
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAdminUser]