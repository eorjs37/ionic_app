import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages = [
    {
      user: 'Question',
      title: 'Question1',
      msg : 'Where are they and how many are there?'
    },
    {
      user: 'Me',
      title: 'Me',
      msg : 'They are four and at home.'
    },
    {
      user: 'AI',
      title: 'AI',
      msg : 'There are four people in the living room'
    },
    {
      user: 'Question',
      title: 'Question2',
      msg : 'What are they doing?'
    },
    {
      user: 'Me',
      title: 'Me',
      msg : 'They are four and at home.'
    },
    {
      user: 'AI',
      title: 'AI',
      msg : 'There are four people in the living room'
    },
    {
      user: 'Question',
      title: 'Question3',
      msg : 'What are they doing?'
    },
    {
      user: 'Me',
      title: 'Me',
      msg : 'They are four and at home.'
    },
    {
      user: 'AI',
      title: 'AI',
      msg : 'There are four people in the living room'
    },
  ]

  currentUser = 'Question';

  constructor() { }

  ngOnInit() {
  }

}
