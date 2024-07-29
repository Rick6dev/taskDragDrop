import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
// import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./card.component.css','gradient.component.css']
})
export class AppComponent {

  public listNumbers1: any[]=[];
  public listNumbers2: any[]=[];
  public listNumbers3: any[]=[];

  constructor() { }

  ngOnInit() {
    this.listNumbers1 = [
      {
        "id": 1,
        "title": "Realizar presentación del proyecto",
        "description": "Preparar diapositivas y ensayar",
        "isProcess": true,
        "isAssigned": true,
        "isCompleted": false
      },
      {
        "id": 2,
        "title": "Corregir errores en el código",
        "description": "Revisar funciones y depurar",
        "isProcess": false,
        "isAssigned": true,
        "isCompleted": false
      },
      {
        "id": 3,
        "title": "Enviar informe final",
        "description": "Incluir resultados y conclusiones",
        "isProcess": false,
        "isAssigned": false,
        "isCompleted": true
      }
    ]
    
    this.listNumbers2 = [];
    this.listNumbers3 = [];
  }
data:any={}
 async drop($event: CdkDragDrop<any[]>) {
    // ... existing logic (console logging, checking containers)

    if ($event.previousContainer !== $event.container) {
      // Update flags based on the destination list
      const draggedItem = await $event.item.data;

      switch ($event.container.id) {
        case 'listNumbers1':
          // Assign values for "En proceso" (In Process)
          draggedItem.isProcess = true;
          draggedItem.isAssigned = true;
          draggedItem.isCompleted = false;
          break;
        case 'listNumbers2':
          // Assign values for "En curso" (In Progress) (assuming a typo)
          draggedItem.isProcess = true;
          draggedItem.isAssigned = true;
          draggedItem.isCompleted = false;
          this.data=draggedItem
          break;
        case 'listNumbers3':
          // Assign values for "Culminados" (Completed)
          draggedItem.isProcess = false;
          draggedItem.isAssigned = false;
          $event.item.data.isCompleted = true;
          break;
      }

      // const draggedItemCopy = cloneDeep(draggedItem);
// console.log('Dragged item copy:', draggedItemCopy);
      // Log the updated dragged item and all lists after the drop
      console.log('Dragged item after update:', await  draggedItem);
      console.log('List 1:', this.listNumbers1);
      console.log('List 2:', this.listNumbers2);
      console.log('List 3:', this.listNumbers3);

      setTimeout(() => {
        console.log($event.item.data)
      }, 1000);
      // Perform transfer or move within the same list (if needed)
      transferArrayItem($event.previousContainer.data, $event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      // Handle move within the same list (optional)
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    }
  }
}
