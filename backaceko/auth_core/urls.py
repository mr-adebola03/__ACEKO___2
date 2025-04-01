from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    LogoutView,
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
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # admin endpoints
    path('admin/users/<int:pk>/approve/', ApproveUserView.as_view(), name='approve-user'),
    path('admin/pending-approvals/', PendingApprovalListView.as_view(), name='pending-approvals'),
]