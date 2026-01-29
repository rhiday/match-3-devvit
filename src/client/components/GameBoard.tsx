import type { Board } from '../../shared/types';
import { Tile } from './Tile';

interface GameBoardProps {
    board: Board;
    onTileClick: (row: number, col: number) => void;
    selectedTile: { row: number; col: number } | null;
    matchedTiles: Set<string>;
    shakingTile: { row: number; col: number } | null;
}

export function GameBoard({
    board,
    onTileClick,
    selectedTile,
    matchedTiles,
    shakingTile,
}: GameBoardProps) {
    const isSelected = (row: number, col: number) => {
        return selectedTile?.row === row && selectedTile?.col === col;
    };

    const isMatched = (row: number, col: number) => {
        return matchedTiles.has(`${row},${col}`);
    };

    const isShaking = (row: number, col: number) => {
        return shakingTile?.row === row && shakingTile?.col === col;
    };

    return (
        <div className="relative mx-auto w-full max-w-md">
            {/* Game board container */}
            <div
                className="
          grid gap-2 rounded-3xl
          bg-gray-900
          p-4 shadow-2xl
        "
                style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridTemplateRows: 'repeat(5, 1fr)',
                    aspectRatio: '1 / 1',
                }}
            >
                {board.tiles.map((row, rowIndex) =>
                    row.map((tile, colIndex) => (
                        <div
                            key={tile.id}
                            className="aspect-square"
                        >
                            <Tile
                                color={tile.color}
                                onClick={() => onTileClick(rowIndex, colIndex)}
                                isSelected={isSelected(rowIndex, colIndex)}
                                isMatched={isMatched(rowIndex, colIndex)}
                                isShaking={isShaking(rowIndex, colIndex)}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Decorative glow effect */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl" />
        </div>
    );
}
