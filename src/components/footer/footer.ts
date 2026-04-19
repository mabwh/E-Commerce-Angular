import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule
    ],
    templateUrl: './footer.html',
    styleUrl: './footer.css'
})
export class Footer {
    currentYear = new Date().getFullYear();
}
