from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ApproveUserView,
    ChangePasswordView,
    UserProfileView,
    PendingApprovalListView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    
    # admin endpoints
    path('admin/users/<int:pk>/approve/', ApproveUserView.as_view(), name='approve-user'),
    path('admin/pending-approvals/', PendingApprovalListView.as_view(), name='pending-approvals'),
]