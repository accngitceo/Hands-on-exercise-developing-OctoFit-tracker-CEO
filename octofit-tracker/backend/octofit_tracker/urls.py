import os
from django.urls import path
from django.http import JsonResponse


def api_root(request):
    """Return API endpoints using the Codespace URL when available.

    This uses the environment variable `CODESPACE_NAME` so the URLs are
    predictable (https://$CODESPACE_NAME-8000.app.github.dev/api/...) and
    avoids relying on request certificates.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev/api/"
    else:
        scheme = 'https' if request.is_secure() else 'http'
        host = request.get_host()
        base = f"{scheme}://{host}/api/"
    return JsonResponse({'activities': base + 'activities/', 'users': base + 'users/'})


def activities(request):
    return JsonResponse({'activities': []})


urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/activities/', activities, name='activities-list'),
]
