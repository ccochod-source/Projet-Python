with open("phrases.txt") as fichier1:
    with open("majuscules.txt", "w") as fichier:
        for ligne in fichier1:
            ligne = (ligne.upper + "\n")
            fichier.write(ligne)