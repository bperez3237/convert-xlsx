
from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('upload/', csrf_exempt(views.index)),
    path('test/', views.test)
]
