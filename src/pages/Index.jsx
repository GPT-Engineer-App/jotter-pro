import { useState } from "react";
import { Container, VStack, HStack, Input, Textarea, Button, Box, Text, IconButton, Image } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteImage, setNoteImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      image: noteImage,
    };

    setNotes([...notes, newNote]);
    setNoteText("");
    setNoteImage(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNoteText(noteToEdit.text);
    setNoteImage(noteToEdit.image);
    setIsEditing(true);
    setCurrentNoteId(id);
  };

  const handleUpdateNote = () => {
    setNotes(
      notes.map((note) =>
        note.id === currentNoteId ? { ...note, text: noteText, image: noteImage } : note
      )
    );
    setNoteText("");
    setNoteImage(null);
    setIsEditing(false);
    setCurrentNoteId(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNoteImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={4}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearch}
            size="lg"
          />
          <IconButton aria-label="Search" icon={<FaSearch />} size="lg" />
        </HStack>
        <Textarea
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          size="lg"
        />
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {noteImage && <Image src={noteImage} alt="Note" boxSize="100px" />}
        <Button onClick={isEditing ? handleUpdateNote : handleAddNote} colorScheme="blue" size="lg">
          {isEditing ? "Update Note" : "Add Note"}
        </Button>
        <VStack spacing={4} width="100%">
          {filteredNotes.map((note) => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <HStack justifyContent="space-between">
                <Text>{note.text}</Text>
                <HStack>
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => handleEditNote(note.id)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </HStack>
              </HStack>
              {note.image && <Image src={note.image} alt="Note" boxSize="100px" mt={2} />}
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;