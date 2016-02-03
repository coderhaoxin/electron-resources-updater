
### electron-resources-updater

If you only want to update resource files.

### Usage

```js
import Updater from 'electron-resources-updater'

const updater = new Updater({
  resources: [{
    from: 'http://code.jquery.com/jquery-2.1.4.min.js',
    to: 'jquery.min.js'
  }]
})

updater.update()
```

### License
MIT
