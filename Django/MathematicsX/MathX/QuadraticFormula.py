
import random
import os
import cmath


def check_points():
    script_dir = os.path.dirname(os.path.realpath(__file__))

    file_path = os.path.join(script_dir, 'hakatona_punkti.txt')

    with open(file_path, 'r') as file:
        lines = file.readlines()
        if lines:
            current_number = int(lines[-1].strip())
        else:
            current_number = 0

    return current_number

def check():
    print(f'tavi punkti: {check_points()}')

def points_counter():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(script_dir, 'hakatona_punkti.txt')

    with open(file_path, 'r') as file:
        lines = file.readlines()

        if lines:
            current_number = int(lines[-1])

        else:
            current_number = 0

        current_number += 1
        with open(file_path, 'w') as file:
            file.write(str(current_number) + '\n')


def generate_quad_function(user_diskriminants, user_input_1, user_input_2):

    output = ""

    aint = random.randint(1, 10)

    bint = random.randint(-10, 15)

    cint = random.randint(-10, 15)

    D = random.randint(1, 16) ** 2

    diskriminants = (bint**2) - (4*aint*cint)

    if D == diskriminants and cmath.sqrt(D).real.is_integer():
        # print(f"Quadratic function: {aint}x^2 + {bint}x + {cint} = 0; aprēķini x vērtības, noapaļo līdz simtdaļām")
        output += f"Quadratic function: {aint}x^2 + {bint}x + {cint} = 0; aprēķini x vērtības, noapaļo līdz simtdaļām"

        if user_diskriminants == diskriminants:
            output += "diskriminants ir pareizs!\n"
        else:
            output += "diskriminants ir nepareizi aprēķināts, mēģini ar citu funkciju\n"
            return generate_quad_function(user_diskriminants, user_input_1, user_input_2)


        user_input_1 = float(input("x1 = "))
        user_input_2 = float(input("x2 = "))

        risin1 = (-bint-cmath.sqrt(diskriminants))/(2*aint)
        risin2 = (-bint+cmath.sqrt(diskriminants))/(2*aint)

        if isinstance(risin1, complex):
            x = abs(risin1.real) * -1 if risin1.real < 0 else abs(risin1.real)
        else:
            x = abs(risin1) * -1 if risin1 < 0 else abs(risin1)
        if isinstance(risin2, complex):
            y = abs(risin2.real) * -1 if risin2.real < 0 else abs(risin2.real)
        else:
            y = abs(risin2) * -1 if risin2 < 0 else abs(risin2)

        x = round(x, 2)
        y = round(y, 2)

        risin1 = x
        risin2 = y

        if (user_input_1 == risin1 and user_input_2 == risin2) or (user_input_1 == risin2 and user_input_2 == risin1):
            output += f'Pareizi!! :) x1 = {risin1} x2 = {risin2}\n'
            points_counter()
            check()

            again_maybe = input("Ja gribi mēģināt vēlreiz raksti 'yes', ja negribi raksti 'no': ")
            match again_maybe:
                case 'yes':
                    generate_quad_function()
                case 'no':
                    return
        else:
            output += f'nepareizi :(, pareizās atbildes bija x1 = {risin1} x2 = {risin2}\n'
            check
            again_maybe = input("Ja gribi mēģināt vēlreiz raksti 'yes', ja negribi raksti 'no': ")
            match again_maybe:
                case 'yes':
                    generate_quad_function()
                case 'no':
                    return

    else:
        return generate_quad_function(user_diskriminants, user_input_1, user_input_2)

    
    return output

# generate_quad_function()




        # def dparbaudisana():

        #     user_diskriminants = int(input("Aprēķini diskriminantu: "))

        #     if user_diskriminants == diskriminants:
        #         print("diskriminants ir pareizs! ")

        #     else:
        #         print("diskriminants ir nepareizi aprēķināts, mēģini ar citu funkciju")
        #         generate_quad_function()
        
        # dparbaudisana()

        