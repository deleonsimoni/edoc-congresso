import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'subscribers-metrics',
  templateUrl: './subscribers-metrics.component.html',
  styleUrls: ['./subscribers-metrics.component.scss']
})
export class SubscribersMetricsComponent implements OnInit {

  @Input() metrics: any;

  constructor() { }

  ngOnInit() {
  }

}
