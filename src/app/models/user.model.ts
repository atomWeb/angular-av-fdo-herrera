import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

export class User {
  constructor(
    public username: string,
    public email: string,
    public password?: string,
    public image?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  get getImageUrl() {
    if (this.image?.includes('https')) {
      return this.image;
    }

    if (this.image) {
      return `${url_base}/uploads/users/${this.image}`;
    }
    return `${url_base}/uploads/users/no-img.jpg`;
  }
}
