def email_valide(adresse):
    etat = None
    if "@" in adresse:
        etat = True
    else :
        etat = False
    return etat

if __name__ == "__main__" :
    print (email_valide("lelelle@gmail.com"))
