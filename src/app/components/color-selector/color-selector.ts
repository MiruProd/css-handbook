import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-selector.html',
  styleUrl: './color-selector.scss',
})
export class ColorSelector {
  // Двусторонняя модель цвета для связи с родителем
  color = model<string>('#1c7ed6');

  copyColor(): void {
    navigator.clipboard.writeText(this.color());
  }
}
