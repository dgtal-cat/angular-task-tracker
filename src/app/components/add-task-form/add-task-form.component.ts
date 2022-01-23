import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import { Task } from "../../Task";
import { UiService } from "../../services/ui.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  subscription: Subscription
  showAddTask!: boolean
  text!: string
  date!: string
  reminder: boolean = false

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a task text")
      return
    }

    const newTask: Task = {
      text: this.text,
      date: this.date,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text = ''
    this.date = ''
    this.reminder = false
  }

}
