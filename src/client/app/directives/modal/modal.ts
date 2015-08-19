/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, CSSClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';


@Component({
	selector: 'modal',
	properties: ['channel','data', 'type','modalHeader','modalBody']
})

@View({
	templateUrl: 'app/directives/modal/modal.html',
	directives: [CSSClass],
	styleUrls: ['app/directives/modal/modal.css']
})

export class Modal {
	data: any;
	classMap: any;
	dispatcher: any;
	constructor(@Attribute('channel') channel: string ,public el: ElementRef) {
		this.dispatcher = Dispatcher.getInstance();
    	this.dispatcher.subscribe(channel,'open.modal', this.openModal);
    	this.dispatcher.subscribe(channel,'close.modal', this.closeModal);
	};
	openModal = (data:any, msg: any): void => {
		this.data = data;
		this.classMap = { 'md-show': true };
	};
	closeModal = (): void => {
		this.classMap = { 'md-show': false };
	};
	close = (): void =>  {
		this.dispatcher.publish('addons','close.modal', null)

	}
}