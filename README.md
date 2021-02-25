# CVfront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Docker


Run `docker build -t cvfront .` pour compiler l'image docker (build de angular (en mode production) + serveur apache2)

Run `docker run -dit --name my-cvfront -p 80:80 cvfront` pour lancer l'image (sur le port 80 avec le nom "my-cvfront")
