from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from actividades import urls as actividades_urls
from users import urls as users_urls

urlpatterns = [ 
    url(r'^admin/', admin.site.urls),
    url(r'auth/', include('knox.urls'))
]

urlpatterns += actividades_urls.urlpatterns
urlpatterns += users_urls.urlpatterns

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
