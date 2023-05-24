from django.urls import path
from rosters import views

urlpatterns = [
    path('learner/', views.LearnerListView.as_view(), name='LearnerListView'),
    path('learner/<int:pk>/', views.LearnerView.as_view(), name='LearnerView'),
    path('learner/<int:pk>/delete/', views.LearnerDeleteView.as_view(), name='LearnerDeleteView'),
    path('classbatch/', views.ClassBatchListView.as_view(), name='ClassBatchListView'),
    path('classbatch/<int:pk>/', views.ClassBatchView.as_view(), name='ClassBatchView'),
    path('classbatch/<int:pk>/edit/', views.ClassBatchUpdateView.as_view(), name='ClassBatchUpdateView'),
]
