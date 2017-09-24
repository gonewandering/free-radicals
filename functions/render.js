const Handlebars = require('handlebars');

function compileTempate(data, template, context) {
  const compiled = Handlebars.compile(template);
  return compiled(context);
}
