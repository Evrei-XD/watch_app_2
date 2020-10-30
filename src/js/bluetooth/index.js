const bluetooth = () => {
  if (page === `top2`) {
    selectedBluetoothDeviceIndex += direction === `CW` ? 1 : -1;
    selectedBluetoothDeviceIndex = Math.max(
      0,
      Math.min(devices.length - 1, selectedBluetoothDeviceIndex)
    );

    Array.from(devices).forEach((item, index) => {
      if (index === selectedBluetoothDeviceIndex)
        item.classList.add(`page__list-item--selected`);
      else item.classList.remove(`page__list-item--selected`);
    });
    devices[Math.max(0, selectedBluetoothDeviceIndex - 2)].scrollIntoView();
  }
};

bluetooth();
