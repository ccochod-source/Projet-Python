try : 
    valeurA = int(input("Veuillez saisir un nombre :"))
    valeurB = int(input("Veuillez saisir un deuxieme nombre : "))
    ValeurF = valeurA / valeurB

except ValueError :
     print("la saisie ne correspond pas")

except ZeroDivisionError :
    print("Division par 0 impossible")

else :
    print(f"voici le résultat : {ValeurF} ")

finally : 
    print("Fin de transmission")