from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    LogoutView,
    RegisterView,
    LoginView,
    ApproveUserView,
    ChangePasswordView,
    RejectUserView,
    RejectedUsersListView,
    SpecialiteLaboratoireList,
    SpecialiteMedicaleList,
    UpdateProfileView,
    UserDetailView,
    UserProfileView,
    PendingApprovalListView, OptionsView,
    ApprovalListView
)
from src import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/update/', UpdateProfileView.as_view(), name='update-profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('specialites-medicales/', SpecialiteMedicaleList.as_view(), name='specialites-medicales'),
    path('specialites-laboratoires/', SpecialiteLaboratoireList.as_view(), name='specialites-laboratoires'),
    path('option/',OptionsView.as_view(), name='options'),
    
    # admin endpoints
    path('admin/users/<int:pk>/', UserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/<int:pk>/approve/', ApproveUserView.as_view(), name='approve-user'),
    path('admin/pending-approvals/', PendingApprovalListView.as_view(), name='pending-approvals'),
    path('admin/users-approvals/', ApprovalListView.as_view(), name='users-approvals'),
    path('admin/users/<int:pk>/reject/', RejectUserView.as_view(), name='reject-user'),
    path('admin/users/rejected/', RejectedUsersListView.as_view(), name='rejected-users'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)