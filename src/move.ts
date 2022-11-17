type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};
export default function move(list: Folder[], source: string, destination: string): Folder[] {
  const currentFolderList: Folder[] = list;
  const sourceFileId: string = source;
  const folderDestination: string = destination;

  let sourceFolder: Folder;
  let destinationFolder: Folder;
  let sourceFile: File;

  currentFolderList.forEach((folder) => {
    if (folder.id === sourceFileId) throw new Error('You cannot move a folder');
    if (folder.id === folderDestination) destinationFolder = folder;

    folder.files.forEach((file) => {
      if (file.id === folderDestination)
        throw new Error('You cannot specify a file as the destination');
      if (file.id === sourceFileId) {
        sourceFolder = folder;
        sourceFile = file;
      }
    });
  });

  const newFolderList: Folder[] = [];

  currentFolderList.forEach((folder) => {
    if (folder.id === sourceFolder.id) {
      const newFiles = folder.files.filter((file) => file.id !== sourceFile.id);
      newFolderList.push({ ...folder, files: newFiles });
    } else if (folder.id === destinationFolder.id) {
      const newFiles = [...folder.files, sourceFile];
      newFolderList.push({ ...folder, files: newFiles });
    } else {
      newFolderList.push(folder);
    }
  });

  return newFolderList;
}
