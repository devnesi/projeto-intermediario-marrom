# projeto-intermediario-marrom

end points
1. /olx/terrenos
2. /olx/carros

parametros em ambos  
inteiro page = paginacao para recuperar mais informacacoes  
string q = query string para filtrar no campo title 
##

libs  
1. express como servidor http  
2. axios para realizar requests http  
3. xpath e xmldom para converter e filtrar o html
##

objeto de retorno  (http://localhost:3000/olx/carros?page=2&q=Jetta)
```javascript
{
  "proxima": "http://localhost:3000/olx/carros?page=3&q=Jetta",
  "anterior": "http://localhost:3000/olx/carros?page=2&q=Jetta",
  "results": [
    {
      "href": "https://sc.olx.com.br/florianopolis-e-regiao/autos-e-pecas/carros-vans-e-utilitarios/jetta-higlhine-878780470",
      "title": "Jetta higlhine ",
      "image": "https://img.olx.com.br/thumbs256x256/54/548107168432243.jpg"
    }
  ]
}
```
proxima = proxima pagina  
anterior = pagina anterior  
results = array de resultados  
