import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../model/task';
import { faPencilAlt, faPaperPlane, faTimes, faPlus, faClock, faCalendarAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  tareas: Task[];
  procesando: Task[];
  listo: Task[];
  pendiente: Task[];
  eliminados: Task[];
  results: Task[];
  sizeArreglo: number = 0;
  bandera: boolean = false;
  carga: boolean = false;
  editar: boolean = false;
  hoy = new Date();
  fecha_hoy = this.fecha_deHoy();
  lapiz = faPencilAlt;
  avioncito = faPaperPlane;
  cerrar = faTimes;
  agregar = faPlus;
  reloj = faClock;
  calendario = faCalendarAlt;
  borrar = faTrashAlt;

  constructor(private servicio: TasksService, private fb: FormBuilder) {
    this.tareas = [];
    this.procesando = [];
    this.listo = [];
    this.pendiente = [];
    this.eliminados = [];
    this.results = [];
  }

  miFormulario = this.fb.group({
    id      : [],
    producto: [, [Validators.required, Validators.minLength(5)]],
    tipo    : [, [Validators.required, Validators.minLength(5)]],
    titulo  : [],
    fecha   : [, [Validators.required, Validators.minLength(5)]],
    estado  : [''],
    activo  : [ ]
  });

  limpiarForm(){
    this.miFormulario.reset();
  }

  fieldFormValid(campo: string) {
    return this.miFormulario.controls[campo].errors
        && this.miFormulario.controls[campo].touched;
  }

  enviar() {
    let tarea_lista = this.miFormulario.value;

    if (this.carga) {
      this.postTask(tarea_lista);
    } else {
      this.putTask(tarea_lista);
    }
    location.reload();
  }

  changeCarga() {
    this.editar = false;
    this.carga = true;
  }

  changeEditar(id: number) {
    this.editar = true;
    this.carga = false;
    this.editandoTarea(id);
  }

  editandoTarea(id: number) {
    const editarTarea = this.tareas.find(tarea => tarea.id === id);    
    this.rellenarFormuluario(editarTarea)
  }

  rellenarFormuluario( tarea: any) {
    return this.miFormulario.patchValue(tarea);
  }

  async ngOnInit() {
    this.getTask().subscribe(data => {
      this.tareas = data as Task[];
      this.distribuirTasks();
      this.pagination();
    });
  }

  getTask(): Observable<Task[]> {
    return this.servicio.getTask();
  }

  distribuirTasks() {
    this.tareas.forEach(tarea => {

      if (tarea.activo) {
        let tarea_fecha = new Date(tarea.fecha);
        let dia_tarea = tarea_fecha.getDate();
        let mes_tarea = tarea_fecha.getMonth() + 1;
        let año_tarea = tarea_fecha.getFullYear();        
        let fecha_tarea = `${dia_tarea}/${mes_tarea}/${año_tarea}`;
        
        if (fecha_tarea.valueOf() === this.fecha_hoy.valueOf()) {
          this.procesando.push(tarea);

        } else if (tarea_fecha > this.hoy) {
          this.pendiente.push(tarea);

        } else if (tarea_fecha < this.hoy) {
          this.listo.push(tarea);
        }
      } else {
        this.eliminados.push(tarea);
      }
    });
  }

  pagination(page = 1, limit = 2) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    this.results = this.pendiente.slice(startIndex, endIndex);
    this.sizeArreglo = this.pendiente.length;

    return this.results, this.sizeArreglo;
  }

  changePagination() {
    if (this.bandera) {
      this.pagination(1, this.sizeArreglo);
      this.bandera = false;

    } else {
      this.pagination();
      this.bandera = true;
    }
  }

  toProgress(tarea: Task) {

    console.log(this.hoy);
    
    tarea.fecha = this.hoy;
    tarea.estado = 'IN-PROGRESS';

    this.servicio.putTask(tarea).subscribe(() => {
      console.log("La tarea fue iniciada exitosamente");
      
    }), (error: any) => {
      console.error(error, "No se pudo iniciar la tarea");
    };
    location.reload();
  }

  toDone(tarea: Task){
    let ayer = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
    
    tarea.fecha = ayer;
    tarea.estado = 'DONE';

    this.servicio.putTask(tarea).subscribe(() => {
      console.log("La tarea es DONE exitosamente");
    }), (error: any) => {
      console.error(error, "No se pudo cambiar el estado");
    };
    location.reload();
  }

  deleteTask(tarea: Task) {
    tarea.activo = false;
    tarea.estado = 'DELETE';

    this.servicio.putTask(tarea).subscribe(() => {
      console.log("La tarea fue eliminada exitosamente");
    }), (error: any) => {
      console.error(error, "No se pudo eliminar la tarea");
    };
    location.reload();
  }

  postTask(tarea: Task) {
    tarea.activo = true;

    this.servicio.postTask(tarea).subscribe(() => {
      console.log("La tarea fue almacenada exitosamente");
    }), (error: any) => {
      console.error(error, "No se pudo alamacenar la tarea");
    };
    location.reload();
  }

  putTask(tarea: Task) {

    this.servicio.putTask(tarea).subscribe(() => {
      console.log("La tarea fue actualizada exitosamente");
    }), (error: any) => {
      console.error(error, "No se pudo actualizar la tarea");
    };
    location.reload();
  }

  fecha_deHoy() {
    let dia = this.hoy.getDate();
    let mes = this.hoy.getMonth() + 1;
    let año = this.hoy.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

}