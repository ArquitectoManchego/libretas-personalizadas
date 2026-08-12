# Regla de Workflow Git

Siempre que se realice una modificación o conjunto de cambios en el código fuente de la aplicación web, al finalizar y verificar los cambios se debe ejecutar automáticamente:
```bash
git add .
git commit -m "<mensaje descriptivo de los cambios>"
git push origin master
```
Esto asegura que la plataforma Vercel reciba el cambio inmediatamente y despliegue la nueva versión del catálogo.
