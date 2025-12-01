const seedData = [
  {
    blog: {
      nombre: 'Blog de Tecnología',
      descripcion: 'Todo sobre las últimas tecnologías'
    },
    posts: [
      {
        titulo: 'Introducción a Node.js',
        contenido: 'Node.js es un entorno de ejecución para JavaScript...',
        autor: 'Carlos García'
      },
      {
        titulo: 'React vs Vue',
        contenido: 'Comparativa entre los dos frameworks más populares...',
        autor: 'Ana Martínez'
      }
    ]
  },
  {
    blog: {
      nombre: 'Blog de Viajes',
      descripcion: 'Aventuras alrededor del mundo'
    },
    posts: [
      {
        titulo: 'Mi viaje a Japón',
        contenido:
          'Tokio, Kyoto y más aventuras en el país del sol naciente...',
        autor: 'Laura Kaminski'
      },
      {
        titulo: 'Playas de Tailandia',
        contenido: 'Las mejores playas del sudeste asiático...',
        autor: 'Maya Sánchez'
      }
    ]
  },
  {
    blog: {
      nombre: 'Blog de Cocina',
      descripcion: 'Recetas deliciosas y fáciles'
    },
    posts: [
      {
        titulo: 'Pasta Carbonara Auténtica',
        contenido: 'La receta tradicional italiana paso a paso...',
        autor: 'María Rossi'
      },
      {
        titulo: 'Postres sin azúcar',
        contenido: 'Deliciosas opciones saludables...',
        autor: 'José Fernández'
      }
    ]
  }
]

module.exports = { seedData }
