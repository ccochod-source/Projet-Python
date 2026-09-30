class Coffre:
    def __init__(self,limite):
        self._or_stocke = 0
        self.limite = limite

@property
def or_stocke(self):
    return self._or_stocke

@stock.setter
def or_stock(self,montant):
    if montant < 0 and > self.limite :
        raise ValueError("...")
    self.or_stocke = self.or_stocke + montant 



    
