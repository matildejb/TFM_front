import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-menu-buttons',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './menu-buttons.component.html',
    styleUrl: './menu-buttons.component.css'
})
export class MenuButtonsComponent {
    @Input() parent: string = "";
}
