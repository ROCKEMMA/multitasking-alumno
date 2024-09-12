const usuarios= [
    {
      id_usuario: 1,
      nombre: "Ana Pérez",
      emoji:"🥸",
      tareas_asignadas: [1],
      estados_tareas: {
        1: "en progreso"
      }
    },
    {
      id_usuario: 2,
      nombre: "Luis García",
      emoji:"😑",
      tareas_asignadas: [1, 2],
      estados_tareas: {
        1: "en progreso",
        2: "incompleto"
      }
    },
    {
      id_usuario: 3,
      nombre: "María López",
      emoji:"😪",
      tareas_asignadas: [2, 5],
      estados_tareas: {
        2: "incompleto",
        5: "incompleto"
      }
    },
    {
      id_usuario: 4,
      nombre: "Carlos Sánchez",
      emoji:"😱",
      tareas_asignadas: [3, 4],
      estados_tareas: {
        4: "en progreso",
        6: "incompleto"
      }
    },
    {
      id_usuario: 5,
      nombre: "Laura Martínez",
      emoji:"🤯",
      tareas_asignadas: [5],
      estados_tareas: {
        7: "en progreso"
      }
    }
  ];
  export{usuarios}