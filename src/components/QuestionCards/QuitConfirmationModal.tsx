import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface QuitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const QuitConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: QuitConfirmationModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Quit Quiz</DialogTitle>
        <DialogDescription>
          Are you sure you want to quit this quiz? Your progress will be lost.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-end gap-2">
        <Button variant="outline" onClick={onClose} className="cursor-pointer">
          No
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          className="cursor-pointer"
        >
          Yes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default QuitConfirmationModal;
