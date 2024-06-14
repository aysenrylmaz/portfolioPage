import { Component, Input, OnInit } from '@angular/core';
import { InitialState, Project } from '../_models/project';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project = {} as Project;
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  OpenProjectModal() {
    const initialState: Partial<InitialState> = {
      project: this.project
    };

    const modalOptions: ModalOptions<InitialState>  = {
      class: 'modal-lg',
      initialState
    };

    this.bsModalRef = this.modalService.show(ProjectModalComponent, modalOptions);


  }
}
