import { 
    Dialog, 
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { SidebarGroupAction } from '@/components/ui/sidebar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function NewDirectMessage() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarGroupAction>
                    <PlusIcon />
                    <span className='sr-only'>New Direct Message</span>
                </SidebarGroupAction>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Direct Message</DialogTitle>
                    <DialogDescription>
                        Enter a username to start a new direct message.
                    </DialogDescription>
                </DialogHeader>
                <form className="contents">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor='username'>Username</Label>
                        <Input id='username' type='type' />
                    </div>
                    <DialogFooter>
                        <Button>Start Direct Message</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}