__Keep the filesystem within the notebook__

![](../../imgs/Screenshot%202024-03-13%20at%2019.37.13.png)

It allows to compress the whole project folder and create a self-extracting notebook

![](./../../Screenshot%202024-12-13%20at%2016.07.40.png)

:::note
It does not export anything to a new file, but modifies your notebook with embedded data. __Don't forget to save it afterwards__
:::

It uses a basic `gzip` and stored the data as base64 string inside the internal fields of the notebook. On the next fresh launch it will unpack the data and remove the archive from the notebook.

:::warning
Do not put ~1Gb files into the notebook folder, otherwise it will probably crash WLJS Notebook app.
:::

## Use cases
- Share your notebook with all pictures, iconized data, raw project files maintaining the folder structure.
