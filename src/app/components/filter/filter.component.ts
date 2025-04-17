import { Component, EventEmitter,Output,signal,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-filter',
  imports: [FormsModule,CommonModule,MatSelectModule],
  templateUrl: './filter.component.html',
  encapsulation: ViewEncapsulation.None,
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
  { value: 'members', label: 'Members' }
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

onOrderByChangeWrapper(event: any) {
  const syntheticEvent = { 
    target: { value: event.value }
  } as unknown as Event;
  
  this.onOrderByChange(syntheticEvent);
}

onSortChangeWrapper(event: any) {
  const syntheticEvent = { 
    target: { value: event.value }
  } as unknown as Event;
  
  this.onSortChange(syntheticEvent);
}


}
