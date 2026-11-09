import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../menu/menu';
import { Ingrediente } from '../../model/nutriandina.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, MenuComponent],
  selector: 'app-ingrediente',
  styleUrl: './ingrediente.css',
  templateUrl: './ingrediente.html',
})
export class IngredienteComponent {

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Ingrediente[] = [];
  verDialogo: boolean = false;
  ingrediente: Ingrediente = {} as Ingrediente;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.api.GetIngrediente().subscribe(x => {
      this.items = x;
      this.cdr.detectChanges();
    });
  }

  nuevo() {
    this.ingrediente = {} as Ingrediente;
    this.verDialogo = true;
  }

  editar(item: Ingrediente) {
    this.ingrediente = { ...item };
    this.verDialogo = true;
  }

  guardar() {
    if (this.ingrediente.id) {
      this.api.PutIngrediente(this.ingrediente).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    } else {
      this.api.PostIngrediente(this.ingrediente).subscribe(() => {
        this.verDialogo = false;
        this.listar();
      });
    }
  }

  eliminar(item: Ingrediente) {
    if (!item.id) return;
    this.api.DeleteIngrediente(item).subscribe(() => this.listar());
  }

}
