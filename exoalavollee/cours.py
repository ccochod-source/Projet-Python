with open ("phrases.txt") as fichier_source :
    contenu=fichier_source.read()

contenu_majuscules = contenu.upper()


with open("majuscules.txt", 'w') as fichier_destination :
    fichier_destination.write(contenu_majuscules)
    
    
