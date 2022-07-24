import {OnChanges, Component, forwardRef, Input, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {FilterService} from "primeng/api";

@Component({
  selector: 'lib-selectable-chips',
  templateUrl: './selectable-chips.component.html',
  styleUrls: ['./selectable-chips.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectableChipsComponent),
    multi: true
  }]
})
export class SelectableChipsComponent implements ControlValueAccessor, OnChanges {

  @Input() public items: unknown[];
  public filteredItems: unknown[] = [];

  @Input() public value: string;
  @Input() public name: string;

  public filter: string = '';
  public filteredIngredients: Subject<string> = new Subject();

  private currentValue: unknown[] = [];

  private onChange: (m: any) => void;
  private onTouched: (m: any) => void;

  constructor(
    private filterService: FilterService,
  ) {
    this.filteredIngredients.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      const candidates = [];
      this.items.forEach(item => {
        if (this.filterService.filters.contains(item[this.value], value)) {
          candidates.push(item);
        }
      });
      this.filteredItems = candidates;
      console.log(this.filteredItems);
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items?.currentValue) {
      this.filteredItems = this.items;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: unknown[]): void {
    this.currentValue = value;
  }

  public addOrRemove(event: Event, value: any) {
    event.stopPropagation();
    event.preventDefault();
    if (this.contains(value)) {
      this.remove(value);
    } else {
      this.add(value);
    }
  }

  public contains(value: any): boolean {
    if (this.currentValue instanceof Array) {
      return this.currentValue.indexOf(value) > -1;
    } else if (!!this.currentValue) {
      return this.currentValue === value;
    }

    return false;
  }

  private add(value: unknown) {
    if (!this.contains(value)) {
      if (this.currentValue instanceof Array) {
        this.currentValue.push(value);
      } else {
        this.currentValue = [value];
      }
      this.onChange(this.currentValue);
    }
  }

  private remove(value: unknown) {
    const index = this.currentValue.indexOf(value);
    if (!this.currentValue || index < 0) {
      return;
    }

    this.currentValue.splice(index, 1);
    this.onChange(this.currentValue);
  }
}
