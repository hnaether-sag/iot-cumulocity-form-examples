import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "wifi-form",
  templateUrl: "./example1.component.html",
})
export class Example1Component implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  readonly WPA2_ENT = "WPA2 ENT";
  encryptionTypes = [this.WPA2_ENT, "WPA2 PSK", "WPA PSK"];

  form = this.fb.group({
    ssid: ["", Validators.required],
    encryptionType: [this.encryptionTypes[0], Validators.required],
    username: ["", Validators.required],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(63)],
    ],
  });

  get ssid() {
    return this.form.get("ssid");
  }

  get encryptionType() {
    return this.form.get("encryptionType");
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // dynamically adds the username field if the user chose WPA2 ENT as encryption type
    this.encryptionType.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value === this.WPA2_ENT && !this.username) {
          this.form.addControl(
            "username",
            new FormControl("", Validators.required)
          );
        } else if (value !== this.WPA2_ENT && this.username) {
          this.form.removeControl("username");
        }
      });
  }

  resetFormValues(): void {
    this.form.patchValue({
      ssid: "",
      encryptionType: this.encryptionTypes[0],
      username: "",
      password: "",
    });
  }

  submit(): void {
    // do something with the data
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
