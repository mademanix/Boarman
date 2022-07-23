import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";

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
export class SelectableChipsComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() public items: unknown[];
  @Input() public value: string;
  @Input() public name: string;

  private currentValue: unknown[] = [];
  private visibilityFlag: any[] = [];

  private onChange: (m: any) => void;
  private onTouched: (m: any) => void;

  public ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        if (this.searchInput.nativeElement.value) {
          const textToSearch = this.searchInput.nativeElement.value.toLowerCase();
          const elements = this.items.filter((item: any) => {
            return item[this.value].toLowerCase() === textToSearch
          });
          this.hideChips(elements);
        } else {
          this.showAllChips();
        }
      })
    ).subscribe()
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

  public checkForHide(item: any): boolean {
    return this.visibilityFlag.includes(item);
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

  private hideChips(elements: any[]): void {
    elements.forEach(element => {
      this.visibilityFlag.push({
        strIngredient1: element
      })
    });
  }

  private showAllChips(): void {
    this.visibilityFlag = [];
  }
}
