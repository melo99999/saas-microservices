import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Profile {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
}

interface ProfileTableProps {
  data: Profile[];
}

export function ProfileTable({ data }: ProfileTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last Used</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell>{profile.name}</TableCell>
            <TableCell>{new Date(profile.created).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(profile.lastUsed).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
