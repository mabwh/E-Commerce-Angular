import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './search-bar.html',
    styleUrl: './search-bar.css'
})
export class SearchBar {
    @Output() search = new EventEmitter<string>();

    searchTerm: string = '';

    onSearch() {
        if (this.searchTerm.trim()) {
            this.search.emit(this.searchTerm);
        }
    }

    onClear() {
        this.searchTerm = '';
        this.search.emit('');
    }
}
