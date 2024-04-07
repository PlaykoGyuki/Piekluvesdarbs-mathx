from django.http import JsonResponse
import random

def calculate_roots(request):
    while True:
        aint = random.randint(1, 10)
        bint = random.randint(-10, 10)
        cint = random.randint(-10, 10)
        discriminant = bint**2 - 4*aint*cint

        if discriminant >= 0:
            break 

    response_data = {
        'equation': f"{aint}x^2 {'+' if bint >= 0 else '-'} {abs(bint)}x {'+' if cint >= 0 else '-'} {abs(cint)} = 0",
        'discriminant': discriminant
    }

    return JsonResponse(response_data)