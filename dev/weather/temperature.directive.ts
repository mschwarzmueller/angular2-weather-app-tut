import {Directive, ElementRef, OnInit, HostListener, Renderer, Attribute, Input} from "angular2/core";
@Directive({
    selector: '.temperature'
})
export class TemperatureDirective {
    private tooltip: HTMLElement = null;
    @HostListener('mousemove', ['$event']) onMouseOver(event: MouseEvent) {
        if (this.tooltip === null) {
            this.tooltip = this._renderer.createElement(this._elRef.nativeElement, 'div');
        }
        this.tooltip.innerText = 'Fahrenheit: ' + (this.temperatureCelsius * 1.8 + 32);
        this._renderer.setElementClass(this.tooltip, 'tooltip', true);
        this._renderer.setElementStyle(this.tooltip, 'top', '' + (event.clientY + 3));
        this._renderer.setElementStyle(this.tooltip, 'left', '' + (event.clientX  + 10));
        this._renderer.setElementProperty(this.tooltip, 'hidden', '');
    };
    @HostListener('mouseleave') onMouseLeave() {
        this._renderer.setElementProperty(this.tooltip, 'hidden', 'true');
    };
    
    @Input() temperatureCelsius: number;

    constructor(private _elRef: ElementRef, private _renderer: Renderer) {
    }
}