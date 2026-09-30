
def valider_emails():
    for mail in range(1, 4):
        email = input(f"Veuillez saisir le mail  {mail} : ")

        if "@" not in email:
            raise ValueError(f"Le mail numéro {mail} ne contient pas de @")

    print("Les trois adresses sont valides")


try:
    valider_emails()
except ValueError as e:
    print(e)