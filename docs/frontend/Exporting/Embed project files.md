# Embed Project Files

__Keep the entire file system within the notebook__

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

This feature allows you to compress your entire project folder and create a self-extracting notebook.

![](./../../Screenshot%202024-12-13%20at%2016.07.40.png)

:::note
This process does not export anything to a new file—it modifies your current notebook by embedding the data. __Don't forget to save the notebook afterward.__
:::

It uses basic `gzip` compression and stores the data as a base64 string within the notebook's internal fields. Upon the next fresh launch, the data is automatically unpacked and the archive is removed from the notebook.

:::warning
Avoid embedding files around ~1GB or larger into the notebook folder, as this may cause the WLJS Notebook app to crash.
:::

## Use Cases
- Share your notebook with all images, iconized data, and raw project files while preserving the folder structure.

