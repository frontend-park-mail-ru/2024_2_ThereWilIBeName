interface Handlebars {
    compile(template: string): (context: any) => string;
}