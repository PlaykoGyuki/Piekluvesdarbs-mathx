# MathematicsX-Android-

Firstly install all of the dependencies:
In "MathematicsX" type npm install
In "Django/MathematicsX/MathX" pip install djangorestframework


To run the application open the main folder "MathematicsX" and in the terminal use "npx expo start", while
simultaneously opening a second window where the directory "Django/MathematicsX/MathX" is open, and in it's 
directory terminal write "python manage.py runserver 192.168.x.xxx:8000", the "x" are replaced by your ip address.
Aswell as in the main folder "MathematicsX/Quadratic/Eqyat1Task.jsx" on line 22 
"const response = await axios.get('http://192.168.x.xxx:8000/api/calculate_roots/');" the ip also needs to be
replaced.

To view the application, the app "Expo Go" is needed.
