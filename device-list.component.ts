import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {
  @Input() devices: any[] = [];
  @Input() onDeviceSelect: (deviceId: string) => void;

  selectDevice(deviceId: string) {
    this.onDeviceSelect(deviceId);
  }
}
