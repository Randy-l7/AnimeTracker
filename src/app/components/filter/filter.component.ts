import { Component, EventEmitter,Output,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

@Output() filterChange = new EventEmitter<{ orderBy: string,sort: string}>();

selectedOrderBy = signal('score');
selectedSort = signal('desc')

orderByOptions = [
  { value: 'score', label: 'Score' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'start_date', label: 'Release Date' },
  { value: 'members', label: 'Number of Members' }
];

onOrderByChange(event : Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  this.selectedOrderBy.set(selectedValue);
  this.emitFilterChange();
}

onSortChange(event : Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  this.selectedSort.set(selectedValue);
  console.log(selectedValue)
  this.emitFilterChange();
}


private emitFilterChange() {
  this.filterChange.emit({
    orderBy: this.selectedOrderBy(),
    sort: this.selectedSort()
  })
}

}
