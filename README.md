# Image_2_HTML

This small tool was inspired by Unsplash's lazy loading process. It converts an image file stream into a set of divs that appear as a blurred version of the image. Using divs instead of an image thumbnail as a placeholder creates a very quick page load time. The html output for an image is only around 1.5kb. The idea is, when you upload an image to your site's api, you use this library to generate an html string, which you can then store in your database. Then, when server side rendering a page, instead of inserting an image tag, you insert the generated html, then later lazyload the final image.

This library only works with server-side node. The underlying library (sharp) will not work in browser based apps.

Usage is very straightforward:

`image2html(width, height, blurAmount, imageBuffer)`

```js
const image2html = require('image_2_html');
image2html("500px", "350px", 50, imageBuffer).then((html) => doSomethingWithHTML()));
```

The output will appear in the following format:

```html

    <div style="height: 350px; width: 500px; overflow: hidden;">
      <div style="background: rgb(234,166,82); width: 100%; height: 100%;">
        <div style="display: flex; width: 100%; height: 100%; flex-wrap: wrap; filter: blur(50px);">
          <div style="background: rgb(66,135,117); width: 25%; height: 25%"></div>
          <div style="background: rgb(116,177,162); width: 25%; height: 25%"></div>
          <div style="background: rgb(227,219,212); width: 25%; height: 25%"></div>
          <div style="background: rgb(87,156,139); width: 25%; height: 25%"></div>
          <div style="background: rgb(143,37,23); width: 25%; height: 25%"></div>
          <div style="background: rgb(94,111,54); width: 25%; height: 25%"></div>
          <div style="background: rgb(239,226,219); width: 25%; height: 25%"></div>
          <div style="background: rgb(234,166,82); width: 25%; height: 25%"></div>
          <div style="background: rgb(233,220,213); width: 25%; height: 25%"></div>
          <div style="background: rgb(105,157,140); width: 25%; height: 25%"></div>
          <div style="background: rgb(229,187,146); width: 25%; height: 25%"></div>
          <div style="background: rgb(138,159,135); width: 25%; height: 25%"></div>
          <div style="background: rgb(238,226,220); width: 25%; height: 25%"></div>
          <div style="background: rgb(107,165,150); width: 25%; height: 25%"></div>
          <div style="background: rgb(245,185,87); width: 25%; height: 25%"></div>
          <div style="background: rgb(234,199,153); width: 25%; height: 25%"></div>
        </div>
      </div>
    </div>
```

So this image

![alt text](https://i.imgur.com/vt76ZiE.jpg)

Generates this set of styled divs

![alt text](https://i.imgur.com/zPxj5MQ.png)

### A couple examples of retreiving an image buffer:

Using fs:

```const imageBuffer = fs.readFileSync('somefile.jpg')```

Using node-fetch on an image url:

```js
const imageBuffer = await fetch(url)
    .then((res) => res.arrayBuffer())
    .then((resA) => {
      return Buffer.from(resA);
    });
image2html("50%", "35%", 50, imageBuffer).then((html) => console.log(html));
```
